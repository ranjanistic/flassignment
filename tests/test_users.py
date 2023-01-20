
def test_index(client):
    response = client.get("/")
    data = response.json
    assert data["next"] is not None
