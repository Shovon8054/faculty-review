
const Footer = () => {
  return (
    <div className="mt-auto">
        <footer className="bg-[#1E293B] text-white py-4">
            <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-[#F8FAFC]">
                &copy; {new Date().getFullYear()} Developed by{" "}
                <span className="font-semibold text-[#38BDF8]">Mehedi Shovon</span>
            </p>
            </div>
        </footer>
    </div>
  )
}

export default Footer
