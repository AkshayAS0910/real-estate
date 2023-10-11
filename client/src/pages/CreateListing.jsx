export default function CreateListing() {
  return (
    <main className="mx-auto max-w-4xl p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">
        Create a Listing
      </h1>
      <form className="gap4 flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="rounded-lg border p-3  "
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="rounded-lg border p-3  "
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="rounded-lg border p-3  "
            id="address"
            required
          />
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div
            className="flex flex-wrap gap-6
          "
          >
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="w-16 rounded-lg border border-gray-300 p-3"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="w-16 rounded-lg border border-gray-300 p-3"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="0"
                required
                className="w-24 rounded-lg border border-gray-300 p-3"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ per month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedPrice"
                min="0"
                required
                className="w-24 rounded-lg border border-gray-300 p-3"
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ per month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <p className="font-semibold">
            Images:
            <span className="ml-2 font-normal text-gray-600">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="w-full rounded border border-gray-300 p-3"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="rounded border border-green-700 p-3 uppercase text-green-700 hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="rounded-lg bg-slate-700 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
