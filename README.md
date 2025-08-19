# تسجيل الطلبيات (Order Registration) 📝

This is a simple, single-page web application designed to help businesses register orders. The application is written in pure HTML, CSS, and JavaScript, making it lightweight and easy to use. A key feature is its ability to generate a summary of the order and save it as a **PDF file**, with full support for Arabic characters.

## Features ✨

- **Arabic Support**: The interface is fully in Arabic, and the generated PDF file correctly displays Arabic text.
- **Simple & Intuitive Interface**: A clean and easy-to-use form to enter customer details and select products and their quantities.
- **Dynamic Order Summary**: A summary of the selected products and customer information is generated on the fly.
- **PDF Generation**: The application uses **`html2canvas`** and **`jsPDF`** to convert the order summary into a high-quality PDF document, ensuring correct rendering of Arabic script by first capturing it as an image.
- **No Backend Required**: This is a standalone client-side application that works entirely in the user's browser, with no need for a server or a database.
- **Quick Actions**: Includes buttons to quickly **fill a demo order** for testing and **reset all fields** for a new order.

## How to Use 🚀

1. **Open the Application**: Simply open the `Index_v2.html` file in any modern web browser.
2. **Enter Customer Information**: Fill in the **shop name**, **phone number**, and **location**. The order date is automatically populated with the current date.
3. **Select Products**: Check the box next to the products the customer wants to order and enter the desired **quantity** in the input field next to them.
4. **Save as PDF**: Click the **`حفظ الطلبية بصيغة PDF`** (Save Order as PDF) button. A PDF file with the order summary will be generated and downloaded to your device.

## Technologies Used 💻

- **HTML**: The basic structure of the application.
- **CSS**: For styling and layout.
- **JavaScript**: For all the application's logic and functionality.
- **`html2canvas`**: A JavaScript library used to take screenshots of the HTML elements. This is crucial for correctly rendering the Arabic text in the PDF.
- **`jsPDF`**: A client-side JavaScript library for generating PDF files.

## Acknowledgements 🙏

- [**`html2canvas`**](https://html2canvas.hertzen.com/): A library to capture the HTML content as an image.
- [**`jsPDF`**](https://raw.githack.com/MrRio/jsPDF/master/docs/): A powerful library for creating PDF documents in JavaScript.
