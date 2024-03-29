export default function Footer() {
  return (
    <footer className="h-16 w-full flex items-center justify-center border-t border-neutral-300 dark:border-neutral-700">
      <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()}</p>
    </footer>
  )
}
