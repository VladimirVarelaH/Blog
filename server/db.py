from pymongo import MongoClient

# Conection with the local DB
MONGO_URI = "mongodb://localhost"
client = MongoClient(MONGO_URI)
database = client["blog_reactmongo"]
collection_users = database["users"]
collection_posts = database["posts"]