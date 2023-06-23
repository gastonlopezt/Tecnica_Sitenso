import Link from 'next/link';
import Image from 'next/image';


const MainCard = ({ }) => {
    return (
        <>
            <div className=''>
                <div className='mt-8 h-1/3 '>
                    <Link href="/comics" className='mt-8 h-1/2 w-full'>
                            <h1 className='w-full text-3xl p-2 bg-black text-red-600 font-bold uppercase'>Comics</h1>
                            <div >
                                <Image priority={true} src="/images/comic12.jpg" width={300} height={250} alt='Comic' className='h-64 md:h-80 lg:h-96 w-full'/>
                            </div>
                    </Link>
                </div>
                <div className='mt-8 h-1/3'>
                    <Link href="/characters" >
                            <h1 className='text-3xl p-2 bg-black text-red-600 font-bold uppercase text-right'>Characters</h1>
                            <div >
                                <Image src="/images/character.jpg" width={240} height={400} alt='Character' className='h-64 md:h-96 lg:h-96 w-full'/>
                            </div>
                    </Link>
                </div>
            </div>
        </>
        
    );
  };
  
  export default MainCard;