class VectorUtils:
    import numpy as np
    "This function takes two embeddings and gives you how similar they are in a single float number."
    @staticmethod
    def cosine_similarity(vec1: np.ndarray, vec2: np.ndarray):
        from sentence_transformers import util
        return util.cos_sim(vec1, vec2).item()