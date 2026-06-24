def calculate_energy_score(
    cooling_score,
    sustainability_score
):

    score = round(
        cooling_score * 0.7 +
        sustainability_score * 0.3
    )

    return score