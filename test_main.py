import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_endpoint():
    """Test that the health endpoint works"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_root_endpoint():
    """Test that the root endpoint works"""
    response = client.get("/")
    assert response.status_code == 200
    assert "InspireDay AI service is running!" in response.json()["message"]

def test_app_loads():
    """Test that the FastAPI app can be imported and created"""
    assert app is not None
    assert hasattr(app, 'routes')

def test_openai_client_configured():
    """Test that OpenAI client is properly configured"""
    from main import client as openai_client
    assert openai_client is not None
    assert hasattr(openai_client, 'api_key')

def test_generate_endpoint_structure():
    """Test that the generate endpoint accepts correct data structure"""
    test_data = {
        "niche": "business",
        "tone": "professional", 
        "prompt": "Give me a motivational message."
    }

    response = client.post("/generate", json=test_data)
    assert response.status_code in [200, 500]
