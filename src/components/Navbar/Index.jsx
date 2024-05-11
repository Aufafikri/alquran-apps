import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="bg-backgroundColor p-4">
      <nav className="flex items-center justify-between max-sm:block">
        <div className='flex justify-center items-center gap-16'>
          <Link href="/" className="text-3xl font-bold text-textColor">Al-Quran</Link>
          <Link href="/" className='lg:hidden md:hidden text-white ml-10 text-xl underline'>Back</Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar