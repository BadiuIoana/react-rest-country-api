[Frontend Mentor](https://www.frontendmentor.io) challenges help you improve your coding skills by building realistic projects.

## The challenge

Your challenge is to integrate with the [REST Countries V2 API](https://restcountries.com/#api-endpoints-v2) to pull country data and display it like in the designs.

You can use any JavaScript framework/library on the front-end such as [React](https://reactjs.org) or [Vue](https://vuejs.org). You also have complete control over which packages you use to do things like make HTTP requests or style your project.

Your users should be able to:

-   See all countries from the API on the homepage
-   Search for a country using an `input` field
-   Filter countries by region
-   Click on a country to see more detailed information on a separate page
-   Click through to the border countries on the detail page
-   Toggle the color scheme between light and dark mode _(optional)_

**Comments about the code**

-   Attention when using useEffect()! If in the body of this hook you are fetching data from REST API, you must consider that the rest of code that is after that hook will be rendered in the same time. It is ASYNC, you should check if the process is done( using another variables and if statements - see Homepage.js).
-   All functions in javascript are objects. When one state variable changes, the component that use it will rerun the logic(!not the JSX - will not render the DOM) and the functions will be recreated! => infinite loop when using a function as a dependency for a hook => useCallback() hook to specify when to recreate the function and when not.

**Some nice improvements**

-   create a custom hook for fetching data from REST API
-   useMemo for allCountries variable and avoid making so many fetch requests
-   at the country details, at neighbors it should be displayed the full name of the country
