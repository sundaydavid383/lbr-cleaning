import fitz 
import os



if os.path.exists('ADJUSTMENT LBR NEW PROFILE CURVE.pdf'):
    pdf_path = 'ADJUSTMENT LBR NEW PROFILE CURVE.pdf'
else:
    print("the file path doesnt exist")


output_dir = 'pdf_content'
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

for page_num in range(len(doc)):
    page = doc[page_num]

    text = page.get_text("text")
    text_file_path = os.path.join(output_dir, f"page_{page_num+1}.txt")
    with open(text_file_path, 'w', encoding='utf-8') as f:
        f.write(text)

    print(f"Extracted text from page {page_num+1} to {text_file_path}")


    page_folder = os.path.join(output_dir, f"page_{page_num+1}_images")
    os.makedirs(page_folder, exist_ok=True)


    for i, img in enumerate(page.get_images(full=True)):
        xref = img[0]
        base_image = doc.extract_image(xref)
        images_bytes = base_image['image']
        img_ext = base_image['ext']

        img_path  = os.path.join(page_folder, f"page{page_num+1}_img{i+1}.{img_ext}")
        with open(img_path, 'wb') as f:
            f.write(images_bytes)
        
        print(f"Saved image {img_path}")



