import http.client

conn = http.client.HTTPSConnection("text-to-video.p.rapidapi.com")

payload = "{\"script\":\"Welcome to our YouTube channel where we will guide you through an exciting 2-day itinerary to visit Bali. Day 1, start your morning by exploring the iconic Tanah Lot temple and enjoy the stunning sunrise views. Afterward, head to the laid-back town of Ubud, where you can visit the famous Monkey Forest and experience the traditional Balinese culture.\",\"dimension\":\"16:9\"}"

headers = {
    'x-rapidapi-key': "82b0f12aa8msh5b6fffc840680bcp1ed97cjsn11ee539201cd",
    'x-rapidapi-host': "text-to-video.p.rapidapi.com",
    'Content-Type': "application/json"
}

conn.request("POST", "/v3/process_text_and_search_media", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))