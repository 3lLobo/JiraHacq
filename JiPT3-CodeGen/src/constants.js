const text = `# File name: hacker_news_card.py
# TODO: Fetch the news feed from HackerNews and return a card with an image and the title over the image.

,
,
# Imports
import requests
from bs4 import BeautifulSoup
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
import os

# Constants
HACKER_NEWS_URL = "https://news.ycombinator.com/"

# Functions
def get_news_feed():
    """
    Returns the news feed from HackerNews.
    """
    return requests.get(HACKER_NEWS_URL)

def get,
,_news_feed_html(news_feed):
    """
    Returns the news feed html from HackerNews.
    """
    return BeautifulSoup(news_feed.text, "html.parser")

def get_news_feed_list(news_feed_html):
    """
    Returns the news feed list from HackerNews.
    """
    return news_feed_html.find_all("tr", {"class": "athing"})

def get_news_feed,
,_title(news_feed_list):
    """
    Returns the news feed title from HackerNews.
    """
    return news_feed_list.find("a", {"class": "storylink"}).text

def get_news_feed_image(news_feed_list):
    """
    Returns the news feed image from HackerNews.
    """
    return news_feed_list.find("img")["src"]

def get_news_feed_image_response,
,(news_feed_image):
    """
    Returns the news feed image response from HackerNews.
    """
    return requests.get(news_feed_image)

def create_news_feed_image(news_feed_image_response):
    """
    Returns the news feed image from HackerNews.
    """
    return Image.open(BytesIO(news_feed_image_response.content))

def create_news_feed_image_with_text(news_,
,feed_image, news_feed_title):
    """
    Returns the news feed image with the title over the image from HackerNews.
    """
    image_with_text = news_feed_image
    draw = ImageDraw.Draw(image_with_text)
    font = ImageFont.truetype(os.path.join(os.path.dirname(__file__), "fonts/Roboto-Bold.ttf"), size=30)
    text,
,_width, text_height = draw.textsize(news_feed_title, font=font)
    margin = offset = 10
    x1 = margin
    y1 = news_feed_image.height - text_height - offset
    x2 = news_feed_image.width - margin
    y2 = news_feed_image.height - offset
    draw.rectangle(((x1, y1), (x2, y2)), fill="black")
    draw.,
,text(((news_feed_image.width - text_width) / 2, y1 + offset), news_feed_title, font=font, fill="white")
    return image_with_text

def get_news_feed_card(news_feed_image_with_text):
    """
    Returns the news feed card from HackerNews.
    """
    return {
        "type": "AdaptiveCard",
        "body": [
            {
                "type,
,": "Image",
                "url": news_feed_image_with_text.url,
                "size": "stretch"
            }
        ],
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.0"
    }

# Main function
def main():
    """
    Main function.
    """
    news_feed = get_news_feed()
    news,
,_feed_html = get_news_feed_html(news_feed)
    news_feed_list = get_news_feed_list(news_feed_html)
    news_feed_title = get_news_feed_title(news_feed_list)
    news_feed_image = get_news_feed_image(news_feed_list)
    news_feed_image_response = get_news_feed_image_response(news_feed_image)
,
,    news_feed_image = create_news_feed_image(news_feed_image_response)
    news_feed_image_with_text = create_news_feed_image_with_text(news_feed_image, news_feed_title)
    news_feed_card = get_news_feed_card(news_feed_image_with_text)
    print(news_feed_card)

if __name__ == "__main__":
    main,
,()
`
const finish_reason = false

export default { text, finish_reason }