import './App.css'
import { PillMenu } from "./components/PillMenu"
import { Page } from "./components/Page"
import { useState } from "react"

function App() {
  const [theme, setTheme] = useState({
    font: "inter",
    accent: "#b5472f",
    layout: "classic",
    mode: "light"
  })
  const [isPreview, setIsPreview] = useState(false)

  function updateTheme(patch) {
    setTheme(prev => ({ ...prev, ...patch }))
  }

  return (
    <div
      style={isPreview ? { "--accent": theme.accent } : undefined}
    >
      <Page theme={theme} isPreview={isPreview} />
      <PillMenu
        theme={theme}
        onChange={updateTheme}
        isPreview={isPreview}
        onTogglePreview={() => setIsPreview(p => !p)}
      />
    </div>
  )
}

export default App
