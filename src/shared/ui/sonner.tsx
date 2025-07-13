import { Toaster as Sonner } from "sonner"


const Toaster = () => {

  return (
    <Sonner
      theme={"dark"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
    />
  )
}

export { Toaster }
