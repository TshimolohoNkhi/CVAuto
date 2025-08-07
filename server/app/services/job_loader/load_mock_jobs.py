import kagglehub
from kagglehub import KaggleDatasetAdapter

class LoadMockJobs:
    def __init__(self) -> None:
        pass

    def load_dataset(self):
        # Download latest version
        dataset_path = kagglehub.dataset_download("ravindrasinghrana/job-description-dataset")
        print("Path to dataset files:", dataset_path)

        import os
        print("Files in dataset:", os.listdir(dataset_path))

        # Set correct CSV file path (based on what's printed above)
        file_path = os.path.join(dataset_path, "Job_Descriptions.csv")  # or whatever the filename is

        # Load into DataFrame
        df = kagglehub.load_dataset(
            KaggleDatasetAdapter.PANDAS,
            "ravindrasinghrana/job-description-dataset",
            file_path
        )

        # Preview data
        print("First 5 records:\n", df.head())
