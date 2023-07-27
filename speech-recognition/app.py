from flask import Flask, request, jsonify
from flask_restful import Resource, Api
import speech_recognition as sr
import os
from os import path
from difflib import SequenceMatcher
import io
import json

app = Flask(__name__)
api = Api(app)

todos = {}


class API(Resource):
    def post(self):
        request.files['file'].save(request.files['file'].filename)

        AUDIO_FILE = path.join(path.dirname(path.realpath(__file__)), request.files['file'].filename)

        r = sr.Recognizer()
        with sr.AudioFile(AUDIO_FILE) as source:
            audio = r.record(source)

        try:
            data = r.recognize_google(audio, show_all=True)
            os.remove(request.files['file'].filename)

            if request.form.get('debug') == "true":
                return jsonify(data)

            question = json.loads(request.form.get('question'))
            if bool(data) and data.get('alternative') is not None:
                for recognized in data['alternative']:
                    recognized = recognized['transcript']
                    for x in question['answers']:
                        ratio = SequenceMatcher(None, x.lower(), recognized.lower()).ratio()
                        if ratio > 0.75:
                            return x
        except sr.UnknownValueError:
            print("Google Speech Recognition could not understand audio")
        except sr.RequestError as e:
            print("Could not request results from Google Speech Recognition service; {0}".format(e))

        return False

    
api.add_resource(API, '/audio')

if __name__ == '__main__':
    app.run()
