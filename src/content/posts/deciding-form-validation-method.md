---
slug: deciding-form-validation-method
title: Deciding Form Validation Method
date: 2023-01-10
author: ilhammrg
status: publish
tags:
  - article
---

One of the essential parts of the web application is how you send data from client to server. As a web developer, you can use a bunch of different form elements that have unique functionality and their own purpose. Plain and simple. And then you encounter some complex requirements on how the data should be sent, you came up with some questions like these:

Is the email form provided with a valid email address?

Is there any restriction pattern for the password input?

Are there a minimum and maximum lengths for a particular text data?

Should we restrict certain domains for email input?

Is there a maximum file size to upload?

Is the name field ok to be empty?

…and the list goes on.

Turns out there are several specifications that need to be fulfilled. To sum up all of the above questions, we need some kind of data validation. This is what we called form validation. The browser has built-in form validation within the form elements. Form elements have several attributes that can be used to determine how to validate the value. You can visit [MDN documentation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#using_built-in_form_validation) on how to use it.

That's all?

What if the existing browser validation didn’t satisfy our requirements?

This particular situation is where JavaScript shines. The browser provides validation API that can be used to manipulate how the validation logic on a particular form. I will show you an example. Let's say I have an email form like this:

```html
<form>
	<label for="email">Email</label>
	<input type="email" id="email" name="email" required>
	<button type="submit">Submit</button>
</form>
```

When the user clicked the Submit button with an empty email, the form will tell some information that the field is supposed to be filled. It says “Please fill out this field”.

![Screen Shot 2023-01-10 at 11.20.11.png](https://miro.medium.com/max/1088/1*09YhX0lkd4VqeQFuqoSjRA.webp)

The message seems very generic, we want some message that tells specific information on this condition. For this example, we want something like “Please fill out your valid email address”. How do we do that? We can change the validation message using the `setCustomValidity` method. This is the simplest solution out of many alternatives. Even you can create custom error messages with custom text and custom icons if needed.

```jsx
const email = document.getElementById("email");
email.setCustomValidity("Please fill out your valid email address");
```

![Screen Shot 2023-01-10 at 11.36.10.png](https://miro.medium.com/max/1212/1*KM2m9qK7AmiKqY-D9zFsdg.webp)

### Pros & Cons

Built-in validation is easy to implement but it doesn’t have standard error messages across different browsers, so the warning message might be inconsistent between browsers. JavaScript validation requires more code to implement, but it provides more flexibility, and consistent message output is possible through customization. You can customize the error messages and the validation logic, but it comes with caveats. You must pay attention to the implementation details. Some validation may require you to implement complex logic, hence you need to figure out how to test the functionality. Whether you do a manual test or implement end-to-end automated testing.

### Safety Can Be Fun

Client-side validation won’t ensure your app's security. Especially when the users can easily modify the logic since it is in the browser that is highly customizable. Don’t expect your server and database to be fine by just implementing client-side validation, your apps are still vulnerable to script kiddies out there. You should also sanitize the inputs in the backend, thus it prevents common security attacks.

Some bad guys out there can simply upload their SQL scripts through the form and let the rest of it take the job. This is an example of SQL injection that is very easy and common to practice by the bad guys. Luckily, most web frameworks have included mechanisms to prevent this. This is just a small example of many web security threats, this topic is very important to grasp by every web dev.

Then you will think, why do we waste the effort to implement client-side validation when the server-side will also do that? 

Imagine you were at the cafe ordering at your table, and you wanted to order a cup of Turkish coffee. Then the waiter went to the kitchen to make sure of the availability. After that, he went back to you to tell you that Turkish coffee wasn’t available at the moment. So you decided to change the order to Latte, then the waiter went back to the kitchen again. This is very frustrating for the customer. Instead, the waiter can make a stock checklist on the menu so he doesn’t have to go back and forth. That is similar to how the browser and server work together. The browser is a waiter that has sufficient knowledge and will guide you on how to submit the data. With client-side validation, less loading time means a better user experience.

### The tricky pseudo-class

We can leverage the CSS pseudo-class to give the appropriate styling to the form validation. For example, we can use the`:invalid` to select a form that is currently in an invalid state. But it is also selected before any user interaction within the form. In this case, we can use`:user-invalid` instead of`:invalid`, hence the selector will be applied after the user interacts within the form element.

Check browser compatibility of any CSS rule you want to apply, especially an experimental one. Alternatively, you can always use the JavaScript approach to do this. If you don’t want to implement this by yourself, there are tons of great form libraries that provide awesome features such as Formik (React.js specific).

### Help users fill in the correct data

The most common practice to inform an invalid form is to give it a red border color. This approach is widely used, but there is a caveat when you give an error based on color only. Users with red-green color blindness might have a hard time seeing the difference. Some text or icons may be appropriate to use alongside the color indicator to make it obvious. The important thing is that you provide meaningful information that won’t be misled the users.