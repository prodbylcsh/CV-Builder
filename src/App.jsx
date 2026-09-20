import './App.css'
import { PillMenu } from "./components/PillMenu"
import { Page } from "./components/Page"
import { useState, useEffect } from "react"

function App() {
  const [theme, setTheme] = useState({
    font: "inter",
    accent: "#b5472f",
    layout: "classic",
    mode: "light"
  })
  const [isPreview, setIsPreview] = useState(false)
  const [printRequested, setPrintRequested] = useState(false)

  function updateTheme(patch) {
    setTheme(prev => ({ ...prev, ...patch }))
  }

  function handleDownload() {
    setIsPreview(true)
    setPrintRequested(true)
  }

  useEffect(() => {
    if (!printRequested) return

    // Reading layout forces the preview font to start loading before we wait on it
    void document.body.offsetHeight

    document.fonts.ready.then(() => {
      window.print()
      setPrintRequested(false)
    })
  }, [printRequested])

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
        onDownload={handleDownload}
      />
    </div>
  )
}

export default App
