import express from "express"; // Importing express using ES module syntax
import fs from "fs"; // Importing fs
import path from "path"; // Importing path
import cors from "cors"; // Importing cors

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Route to handle analytics
app.post("/api/send-analytics", (req, res) => {
    const analytics = req.body;

    const { pauses, pauseTimestamps, replays, speedChanges } = analytics;

    // Use import.meta.url to get the absolute path to the file
    const filePath = path.join(new URL(".", import.meta.url).pathname, "analytics.json");

    // Create a new entry object
    const newEntry = {
        totalReplays: replays,
        totalPauses: pauses,
        pauseTimestamps,
        totalSpeedChanges: speedChanges,
        timestamp: new Date().toISOString(), // Optionally log the timestamp of the interaction
    };

    console.log("New Analytics Entry:", newEntry); // Log the entry to be saved

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File does not exist, create an empty array and write to it
            console.log("File does not exist, creating new file...");
            const initialData = [newEntry];
            fs.writeFile(filePath, JSON.stringify(initialData, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error("Error creating analytics file:", writeErr);
                    return res.status(500).json({ message: "Error creating analytics file" });
                }
                return res.json({ message: "Analytics saved successfully" });
            });
        } else {
            // File exists, read and update it
            fs.readFile(filePath, "utf8", (readErr, data) => {
                if (readErr) {
                    console.error("Error reading analytics file:", readErr);
                    return res.status(500).json({ message: "Error reading analytics file" });
                }

                let existingAnalytics = [];
                try {
                    existingAnalytics = JSON.parse(data);
                } catch (parseError) {
                    console.error("Error parsing JSON:", parseError);
                }

                // Add the new entry to the existing analytics data
                existingAnalytics.push(newEntry);

                // Write the updated data back to the file
                fs.writeFile(filePath, JSON.stringify(existingAnalytics, null, 2), (writeErr) => {
                    if (writeErr) {
                        console.error("Error writing to analytics file:", writeErr);
                        return res.status(500).json({ message: "Error writing to analytics file" });
                    }
                    return res.json({ message: "Analytics saved successfully" });
                });
            });
        }
    });
});

// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
