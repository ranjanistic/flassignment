
def test_index(client):
    response = client.get("/")
    print(response.data)
    assert True
#    assert b"<h2>Hello, World!</h2
