

# Food Product Explorer

## Overview

The **Food Product Explorer** is an interactive web application that allows users to search for food products, view their details, and explore nutritional information. The application uses data fetched from an API (or mock data) and offers various sorting and filtering options to help users find products that match their preferences. 

This is how I approached and solved the problem while building the project, with a focus on the following features:
This is how I approached and solved the problem while building the project, with a focus on the following features:

- **Search by Product Name**
- **Search by Barcode**
- **Category Filter**
- **Sort Options**
- **Load More Products**

---
# Note 
- Openfoodfacts.org didnot have any official documentation regarding API. It only has clear info about   downloading data but the api related urls were vague unlike normal API information.
- Sometimes productlist loading in the homepage(even 'load more' sometimes) might take upto 10 seconds. But it will definitely eventually load. Computers with realtime network speed can see that in action. If it doesnot load even after 15sec, a refresh should do the job. But this is rare.

---

## Key Features and Solutions

### 1. **Search by Product Name**
   - **Problem:** Users should be able to search for food products by name.
   - **Solution:** 
     - Created a controlled input field with React's `useState` hook to handle the search query.
     - Added an `onSubmit` handler to trigger the search function, which filters products based on the search query.
     - Fetched data from openfoodfacts api to display the results.
     - Fetched data from openfoodfacts api to display the results.

```jsx
const handleSearch = async (e) => {
    e.preventDefault();
    // Fetch products based on searchQuery...
};
```

### 2. **Search by Barcode**
   - **Problem:** Users can search for products using barcode numbers.
   - **Solution:** 
     - Similar to the product name search, created a separate controlled input for barcode search.
     - Added an event handler to process barcode searches and display results accordingly.

```jsx
const handleBarcodeSearch = async () => {
    // Fetch product based on barcodeQuery...
};
```

### 3. **Category Filter**
   - **Problem:** Users should be able to filter products by categories.
   - **Solution:** 
     - I fetched category data and displayed it in a dropdown list.
     - Each category is represented by a unique ID, and when a user selects a category, it filters the products accordingly.

```jsx
<select value={selectedCategory} onChange={handleCategoryChange}>
    <option value="">Select a category</option>
    {categories.map((category) => (
        <option key={category.id} value={category.id}>
            {category.name}
        </option>
    ))}
</select>
```

### 4. **Sort Options**
   - **Problem:** Users should be able to sort products based on name or nutrition grade.
   - **Solution:** 
     - Added a dropdown with sorting options (A-Z, Z-A, etc).
     - Added a dropdown with sorting options (A-Z, Z-A, etc).
     - The sorting function reorders the displayed products based on the selected option.

```jsx
const handleSort = (value) => {
    // Sort products based on selected value...
};
```

### 5. **Load More Products**
   - **Problem:** Display a large set of products, but only show a limited number at a time to improve performance.
   - **Solution:** 
     - Implemented pagination by maintaining a `page` state to track the current page.
     - When the "Load More" button is clicked, the next set of products is fetched and displayed.

```jsx
const loadMoreProducts = () => {
    setPage((prev) => prev + 1);
};
```

### 6. **Product Details Page**
   - **Problem:** Each product should have a detailed page where users can view nutritional information and other relevant details.
   - **Solution:** 
     - Created a `ProductDetail` page where detailed information about each product is fetched and displayed using the product's ID from the URL.
     - Used `useParams` from `react-router-dom` to extract the product ID and fetch relevant data.

```jsx
const { id } = useParams();
const [product, setProduct] = useState(null);

useEffect(() => {
    fetchProduct(id);
}, [id]);

// fetchProduct logic...
```

### 7. **Styling and Responsiveness**
   -  The application should be visually appealing and responsive across different screen sizes.
   
    - Used Flexbox and Grid layouts to ensure that the page elements are properly aligned and responsive.
    - Added transitions and hover effects to improve the user experience (e.g., for buttons and product cards).
    - Employed consistent spacing and padding to make the interface neat and user-friendly.
   -  The application should be visually appealing and responsive across different screen sizes.
   
    - Used Flexbox and Grid layouts to ensure that the page elements are properly aligned and responsive.
    - Added transitions and hover effects to improve the user experience (e.g., for buttons and product cards).
    - Employed consistent spacing and padding to make the interface neat and user-friendly.

```css
/* Example of Card Styling */
.product-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
```

---

## Tools and Libraries Used

- **React** for building the user interface and managing state.
- **React Router** for handling navigation between different pages (e.g., Home, Product Details).
- **CSS Flexbox & Grid** for layout and responsive design.
- **Fetch API** for getting product data from the mock or real API.
- **Context API** for managing global state like search queries, selected categories, etc.
- **CSS Transition Effects** to enhance user interaction.

---

## Challenges and Solutions

1. **Handling Dynamic Data:** One of the biggest challenges was managing the dynamic data coming from the product API. To solve this, I used React's `useEffect` hook to fetch the data when the component mounts or when the state changes (such as when a user changes the search query or category).
   
2. **Managing State Across Components:** As different components like the search bar, category filter, and product list needed to access and update the same state, I used the Context API to store and share state across the components.

3. **Ensuring Performance:** Since the app could handle a large number of products, I implemented pagination to prevent the app from becoming too slow when displaying many products at once.

---


