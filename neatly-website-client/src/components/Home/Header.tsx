import Navbar from "../Navbar.tsx";
import Search from "../Search.tsx";

function Header({ onSearchResult, setUserInput }) {
  return (
    <div className="h-screen w-full bg-coverLanding bg-cover">
      <div className="relative flex justify-center">
        <div className="mt-40 text-center font-noto-serif-display text-headline1 text-white">
          A Best Place for Your<br></br>
          Neatly Experience
        </div>
        <div className="py-14 px-14 top-[500px] rounded absolute bg-white">
          <Search onSearchResult={onSearchResult} setUserInput={setUserInput} />
        </div>
      </div>
    </div>
  );
}

export default Header;
