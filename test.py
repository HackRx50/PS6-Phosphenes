import tensorflow as tf
print("TensorFlow version:", tf.__version__)

# Test a simple computation
hello = tf.constant('Hello, TensorFlow!')
tf.print(hello)
