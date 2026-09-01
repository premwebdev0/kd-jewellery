"""
Prem Jewels - Excel to JSON Converter
======================================

Kya karta hai:
    Ye script "products_source.xlsx" (jisme tum Excel me product entries
    daalte ho) ko padhta hai aur usse "data/products.json" bana deta hai
    - jo website (necklace.js / category.js) already use karti hai.

Kaise use karo:
    1. Ye file apne project ke root folder me rakho (jaha index.html hai).
    2. Apni Excel file ka naam "products_source.xlsx" rakho aur usi
       root folder me rakho (ya niche EXCEL_FILE path change kar do).
    3. Terminal me ye ek baar chalao (sirf pehli baar):
           pip install openpyxl
    4. Jab bhi Excel me naya product add karo ya edit karo, bas ye
       command chalao:
           python convert-products.py
    5. Ye "data/products.json" bana/update kar dega. Website me
       koi code change nahi karna padega.

Excel sheet ka format (sheet name: "Products"):
    ID | Category | Product Name | Metal | Purity | Weight (g) | Occasion | Discription | Image File

    Note: ID column ko ignore kiya jaata hai - script khud unique,
    sequential ID assign karta hai, isliye Excel me ID baar-baar 1
    likhne se bhi koi farak nahi padta.
"""

"""
Prem Jewels - Excel to JSON Converter
======================================
"""

import json
import re
from pathlib import Path

import openpyxl

EXCEL_FILE = "products_source.xlsx"
SHEET_NAME = "Products"
OUTPUT_FILE = "data/products.json"


def clean(value):
    if value is None:
        return ""
    text = str(value)
    text = text.replace("\xa0", " ")
    return text.strip()


def main():
    wb = openpyxl.load_workbook(EXCEL_FILE, data_only=True)
    ws = wb[SHEET_NAME]

    rows = list(ws.iter_rows(min_row=2, values_only=True))
    products = []
    next_id = 1

    for row in rows:
        if row is None or all(cell is None for cell in row):
            continue

        (_old_id, category, name, metal, purity, weight, occasion,
         description, image_file) = row[:9]

        category = clean(category).lower()
        name = clean(name)

        if not category or not name:
            continue

        weight_str = f"{weight} g" if weight is not None else ""
        image_file = clean(image_file)
        if image_file and not re.search(r"\.(png|jpg|jpeg|webp)$", image_file, re.I):
            image_file = image_file + ".jpg"

        products.append({
            "id": next_id,
            "category": category,
            "name": name,
            "metal": clean(metal),
            "purity": clean(purity),
            "weight": weight_str,
            "occasion": clean(occasion),
            "description": clean(description),
            "image": image_file,
        })
        next_id += 1

    Path(OUTPUT_FILE).parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)

    print(f"Done! {len(products)} products likhe gaye {OUTPUT_FILE} me.")


if __name__ == "__main__":
    main()