from app.db.jobs_crud import insert_job

class JobPipeline:
    def process_item(self, item, spider):
        cleaned = clean_job_data(item)
        insert_job(cleaned)
        return item

class RecruiterPipeline:
    def process_item(self, item, spider):
        pass
