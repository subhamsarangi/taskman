npx create-next-app@latest project

npm run dev

npm i styled-components

## default
### localfont
```tsx
import localFont from "next/font/local";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
...
<body
    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
```


## Component
#### Code
1. app/component/Sidebar.tsx
```tsx
"use client"
function Sidebar()
  return <SidebarStyled>Sidebar</SidebarStyled>

const SidebarStyled = styled.nav`
  background: red;    
`
export default Sidebar
```

## Provider
### Style Provider
#### Code
1. app/providers/GlobalStyleProvider.tsx
```tsx
"use client"
interface Props { children: React.ReactNode;}
function GlobalStyleProvider({children} : Props)
  return <GlobalStyles>{children}</GlobalStyles>

const GlobalStyles = styled.div`
    padding: 2.5rem;
`;
export default GlobalStyleProvider
```

2. app/layout.tsx
```tsx
...
<GlobalStyleProvider>
    <Sidebar />
    {children}
</GlobalStyleProvider>
...
```
#### Notes
1.  Use interface to define the expected props for a functional component. The `children` prop is of type `React.ReactNode`, meaning it can accept any valid React element, component, or content.
2.  styled function allows you to write scoped CSS within your components, making the styling more modular and easier to manage, compared to traditional global CSS files.



### Context Provider
#### Code
1. app/context/themes.js
//an array of objects
```js
const themes = [
    {
      name: "default", ...
    },
    {
      name: "dark", ...
    },
```

2. app/context/globalProvider.js
```js
"use client"
export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();
export const GlobalProvider = ({ children }) => {
    const [selectedTheme, setSelectedTheme] = useState(0);
    const theme = themes[selectedTheme];
    return <GlobalContext.Provider value={{ theme, }}>
        <GlobalUpdateContext.Provider value={{}}>
            {children}
        </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
}
export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
...
```

3. app/providers/ContextProvider.tsx
```tsx
...
"use client"
interface Props { children : React.ReactNode; }
function ContextProvider({ children }: Props)
  return <GlobalProvider>{ children }</GlobalProvider>

export default ContextProvider;
...
```

4. app/layout.tsx
```tsx
...
<ContextProvider>
  <GlobalStyleProvider>
    <Sidebar />
    {children}
  </GlobalStyleProvider>
</ContextProvider>
...
```
5. app/component/Sidebar.tsx
```tsx
function Sidebar() {
  const {theme } = useGlobalState();
  // console.log(theme);
  return <SidebarStyled theme={theme}>Sidebar</SidebarStyled>
}
const SidebarStyled = styled.nav`
  background: ${ (props) => props.theme.colorBg2};
`
```

#### Note:
1. `app/context/themes.js`: Defines an array of theme objects for application styling.
2. `app/context/globalProvider.js`: Sets up React Contexts for managing and providing global theme state and update functions.
3. `app/providers/ContextProvider.tsx`: Wraps the `GlobalProvider` around child components to provide global state context.
4. `app/layout.tsx`: Uses `ContextProvider` to apply global themes to the application layout.
5. `app/component/Sidebar.tsx`: Accesses the current theme from the global context and renders the sidebar with applied styles.