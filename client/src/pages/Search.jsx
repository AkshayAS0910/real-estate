export default function Search() {
  return (
    <div className="flex flex-col md:min-h-screen md:flex-row">
      <div className="border-b-2 p-7 md:border-r-2">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:{" "}
            </label>
            <input
              className="w-full rounded-lg border p-3"
              type="text"
              id="searchTerm"
              placeholder="Search..."
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="all" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="sale" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="parking" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="furnished" />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select id="sort_order" className=" rounded-lg border bg-white p-3">
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="rounded-lg bg-slate-700 p-3  uppercase text-white hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="min-w-full">
        <h1 className="mt-5 border-b p-3 text-3xl font-semibold text-slate-700">
          Listing Results:
        </h1>
      </div>
    </div>
  );
}
