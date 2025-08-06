from nturl2path import url2pathname
import scrapy
from app.db.recruiter_crud import get_job_portal_links

class JobsSpider(scrapy.Spider):
    name = "jobs_spider"

    def start_requests(self):
        # Pull the job portal links from DB
        urls = get_job_portal_links()

        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        data = {
            "url": response.url,
            "title": response.css("title::text").get(),
            "raw_html": response.text[:500]
        }
        
        print(f"url: {data['url']}")
        print(f"title: {data['title']}")
        print(f"raw_html: {data['raw_html']}")
        
        yield data

    """
    def clean_job_data(raw_job):
        return {
            "title": raw_job.get("title", "").strip(),
            "description": clean_html(raw_job.get("description", "")),
            "location": parse_location(raw_job.get("raw_html")),
            # more fields...
        }
    """


