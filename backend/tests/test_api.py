from fastapi.testclient import TestClient

from app import app

client = TestClient(app)


def test_profile_endpoint():
    response = client.get('/api/profile')
    assert response.status_code == 200
    payload = response.json()
    assert payload['studio'] == 'Everus Studio'
    assert 'specialties' in payload


def test_portfolio_endpoint():
    response = client.get('/api/portfolio')
    assert response.status_code == 200
    payload = response.json()
    assert isinstance(payload, list)
    assert len(payload) >= 3
    project_ids = {item['id'] for item in payload}
    assert not {'thumbnail-viral-reel', 'thumbnail-food-review'} & project_ids
    assert 'thumbnail-design-creative-youtube' not in project_ids
    assert any(item['id'] == 'website-sp-digital-service' for item in payload)
    assert any(item['id'] == 'chatbot-ai-assistant' for item in payload)
    assert any(item['id'] == 'poster-menu-card' for item in payload)
    chatbot = next(item for item in payload if item['id'] == 'chatbot-ai-assistant')
    assert chatbot['rate'] == '₹5,000'
    assert chatbot['liveUrl'] == 'https://my-gemini-chatbot-bjuh.onrender.com/'
    assert chatbot['description'] == 'An AI-powered chatbot built to provide intelligent, interactive conversations.'
    assert chatbot['techStack'] == ['AI', 'Gemini', 'Python', 'API', 'Chatbot']
    website_rates = {
        item['id']: item['rate']
        for item in payload
        if item['category'] == 'website-design'
    }
    assert website_rates == {
        'website-mobile-mart': '₹4,000',
        'website-paintpro': '₹5,500',
        'website-sp-digital-service': '₹2,700',
    }
    assert {
        'thumbnail-beauty',
        'thumbnail-image-1',
        'thumbnail-image-2',
        'thumbnail-image-3',
        'thumbnail-image-5',
        'thumbnail-image-6',
        'thumbnail-image-7',
        'poster-coffee',
        'poster-college-advertisement',
        'poster-invitation',
        'poster-dress',
        'poster-movie',
        'poster-pizza',
        'poster-titanic',
    } <= project_ids
    assert 'thumbnail-image-4' not in project_ids
    expected_thumbnail_titles = {
        'thumbnail-image-1': 'News Thumbnail',
        'thumbnail-image-2': 'Vlog Thumbnail',
        'thumbnail-image-3': 'Mysterious Place Vlog Thumbnail',
        'thumbnail-image-5': 'My First Sales Thumbnail',
        'thumbnail-image-6': 'Study Tips Thumbnail',
        'thumbnail-image-7': 'Digital Content Thumbnail',
    }
    actual_thumbnail_titles = {
        item['id']: item['title']
        for item in payload
        if item['id'] in expected_thumbnail_titles
    }
    assert actual_thumbnail_titles == expected_thumbnail_titles
    thumbnail_prices = [
        int(item['rate'].replace('₹', ''))
        for item in payload
        if item['category'] == 'thumbnail-design'
    ]
    assert len(thumbnail_prices) == 7
    assert all(100 <= price <= 300 for price in thumbnail_prices)
    assert not any(item['id'] == 'poster-yuvamangalam' for item in payload)


def test_work_categories_endpoint():
    response = client.get('/api/work-categories')
    assert response.status_code == 200
    payload = response.json()
    assert isinstance(payload, list)
    assert any(item['id'] == 'thumbnail-design' for item in payload)
    assert any(item['id'] == 'poster-design' for item in payload)
    assert any(item['id'] == 'website-design' for item in payload)
    assert any(item['id'] == 'chatbot' for item in payload)


def test_testimonials_endpoint():
    response = client.get('/api/testimonials')
    assert response.status_code == 200
    payload = response.json()
    assert len(payload) == 30
    assert payload[3]['quote'] == 'Delivery was very fast, and the pricing was affordable.'
    assert all(item['role'] == 'Sample feedback (demo)' for item in payload[3:])
    assert payload[-1]['name'] == 'Sample Client 30'
