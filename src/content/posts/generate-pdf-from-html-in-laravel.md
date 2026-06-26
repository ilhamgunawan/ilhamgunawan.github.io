---
slug: generate-pdf-from-html-in-laravel
title: Generate PDF from HTML in Laravel
date: 2026-06-26
author: ilhammrg
status: publish
tags: 
  - article
---

## Background

In one of my recent projects, I worked on a frontend application built with Laravel. The application consumes separate backend endpoints for two purposes:

1. Displaying HTML content in the browser.
2. Downloading the same content as a PDF file.

At first, this approach worked, but over time we noticed a problem: the logic between these two endpoints became too different. Any changes made to the HTML structure or business logic needed to be maintained in multiple places.

The ideal solution would be to refactor the backend and create a single source of truth. However, due to project constraints, we did not have enough time to perform a proper refactoring. The existing backend logic was already complicated, and changing it introduced a risk of regression.

After discussion with the team, we decided to deprecate the existing PDF endpoint and move the PDF generation responsibility to the frontend flow.

The new approach was:

1. The backend provides the HTML content.
2. The frontend displays the HTML content.
3. The frontend generates a PDF to download.

This allowed us to reuse the existing HTML content without maintaining separate PDF-generation logic.

---

## Evaluating the Options

Before implementing the solution, we considered several approaches.

### Option 1: Render HTML in the DOM and Trigger Print Action

The simplest solution is to render the HTML content in the browser and use the native `window.print()` functionality.

Example:

```jsx
window.print();
```

#### Advantages

- Very simple implementation.
- No additional backend processing.
- Uses the browser's built-in printing capability.

#### Disadvantages

- The final result depends on the user's browser.
- Different browsers may render layouts differently.
- Users still need to manually confirm the print dialog.
- Harder to standardize output for enterprise applications.

Because of these limitations, this approach was not suitable for our use case.

---

### Option 2: Generate PDF Directly in the Browser

Another option is generating the PDF completely on the frontend using JavaScript PDF libraries.

Some popular libraries provide HTML-to-PDF conversion capabilities directly in the browser.

#### Advantages

- More control compared to the browser print approach.
- No additional backend endpoint is required.
- Can work without server-side processing.

#### Disadvantages

- PDF generation depends on the user's device performance.
- Generated files can become large.
- Images may lose quality.
- Some CSS features may not be supported correctly.
- Different browsers can produce different results.

This approach can work for simple documents, but it becomes difficult to maintain for enterprise applications.

---

### Option 3: Generate PDF in Backend-for-Frontend (BFF) — Recommended

The final approach was generating the PDF through a backend endpoint.

The frontend sends the HTML content to Laravel, and Laravel converts it into a PDF before returning the file.

#### Advantages

- Similar flexibility to browser-based PDF generation.
- Better control over the generated output.
- Smaller PDF size with better quality.
- Does not depend on the user's computer resources.
- Output format can be standardized across browsers and devices.

For our case, this provided the best balance between flexibility and maintainability.

---

## Requirements

The implementation requires:

- Laravel application
- Laravel DOMPDF wrapper library
- Any frontend framework or native JavaScript

Install the DOMPDF package:

```bash
composer require barryvdh/laravel-dompdf
```

---

## Implementation Steps

### 1. Create a PDF Generation Endpoint

First, create an endpoint in Laravel that accepts the HTML content.

Example:

```php
Route::post('/generate-pdf', [PdfController::class, 'generate']);
```

---

### 2. Convert HTML Content into PDF

Inside the controller, use DOMPDF to convert HTML into a PDF file.

Example:

```php
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class PdfController extends Controller
{
    public function generate(Request $request)
    {
        $html = $request->input('html');

        $pdf = Pdf::loadHTML($html);

        return $pdf->download('document.pdf');
    }
}
```

At this point, Laravel will handle PDF generation on the server side.

---

### 3. Call the Endpoint from the Frontend

In our case, the endpoint is called from an Alpine.js component inside a Blade view.

The frontend flow is:

1. Get the HTML content.
2. Send it to the Laravel PDF endpoint.
3. Receive the generated PDF response.

Example:

```jsx
async function downloadPdf(html) {
    const response = await fetch('/generate-pdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            html,
        }),
    });

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.pdf';

    document.body.appendChild(link);
    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
}
```

The response is converted into a `Blob`, then attached to a temporary anchor element. The link is clicked programmatically to trigger the download.

---

## Conclusion

Generating PDFs from HTML can be approached in several ways, depending on the application's requirements.

For simple use cases, browser printing or client-side PDF generation might be enough. However, for enterprise applications where consistency, quality, and maintainability matter, generating PDFs on the backend is usually a better choice.

By moving PDF generation into the BFF while keeping the HTML as the source content, we were able to avoid duplicating backend logic and provide a more consistent PDF generation process.