from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return jsonify({"status":"backend running", "service":"ajay-portfolio-api"})

@app.route('/api/sentiment', methods=['POST'])
def sentiment():
    data = request.json or {}
    text = data.get('text','')
    # Minimal demo: simple polarity based on keywords
    score = 0
    if any(w in text.lower() for w in ['good','great','love','excellent']):
        score = 0.9
    elif any(w in text.lower() for w in ['bad','terrible','hate','poor']):
        score = 0.1
    else:
        score = 0.5
    return jsonify({'score':score, 'label': 'positive' if score>0.6 else ('negative' if score<0.4 else 'neutral')})

@app.route('/api/resume/analyze', methods=['POST'])
def resume_analyze():
    # Placeholder: expects text/plain or json {text: '...'}
    data = request.json or {}
    text = data.get('text','')
    # simple heuristics
    score = 70
    if 'tensorflow' in text.lower() or 'pytorch' in text.lower():
        score += 10
    if 'python' in text.lower():
        score += 5
    return jsonify({'ats_score': min(score,100), 'recommendations': ['Add quantifiable achievements','List model deployment experience']})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
