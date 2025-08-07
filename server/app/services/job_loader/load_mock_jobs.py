import kagglehub
from kagglehub import KaggleDatasetAdapter
import pandas as pd
import os
from config.supabase_settings import supabase_settings

class LoadMockJobs:
    def __init__(self) -> None:
        self.supabase, _, _ = supabase_settings()

    def load_dataset(self) -> pd.DataFrame:
        # Download latest version
        dataset_path = kagglehub.dataset_download("ravindrasinghrana/job-description-dataset")
        print("Path to dataset files:", dataset_path)
        print("Files in dataset:", os.listdir(dataset_path))

        csv_path = os.path.join(dataset_path, "job_listings.csv")  # Double-check filename

        # Load into DataFrame
        df = kagglehub.load_dataset(
            KaggleDatasetAdapter.PANDAS,
            "ravindrasinghrana/job-description-dataset",
            csv_path
        )

        print("First 5 records:\n", df.head())
        self.csv_path = csv_path  # Save it for later use if needed
        return df

    def load_to_db(self, df: pd.DataFrame, table_name: str = "jobs") -> str:
        # Generate SQL CREATE TABLE statement
        sql = f'CREATE TABLE IF NOT EXISTS public.{table_name} (\n'
        for col in df.columns:
            col_clean = col.strip().lower().replace(" ", "_")
            dtype = df[col].dtype
            if pd.api.types.is_integer_dtype(dtype):
                sql += f'  "{col_clean}" INTEGER,\n'
            elif pd.api.types.is_float_dtype(dtype):
                sql += f'  "{col_clean}" FLOAT,\n'
            else:
                sql += f'  "{col_clean}" TEXT,\n'
        sql = sql.rstrip(',\n') + "\n);"

        # Execute CREATE TABLE SQL via custom RPC
        response = self.supabase.rpc("execute_sql", {"sql": sql}).execute()
        print("Table creation response:", response)

        # Clean column names
        df.columns = [col.strip().lower().replace(" ", "_") for col in df.columns]

        # Insert in batches
        records = df.to_dict(orient="records")
        batch_size = 100
        for start in range(0, len(records), batch_size):
            batch = records[start:start + batch_size]
            self.supabase.table(table_name).insert(batch).execute()

        print("✅ All data inserted into Supabase")
        return sql





