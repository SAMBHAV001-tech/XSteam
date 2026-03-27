import preprocess
try:
    preprocess.clean_text('Hello world')
except Exception as e:
    print("ERROR MSG:")
    print(str(e))
