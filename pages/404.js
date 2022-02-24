
export default function Custom404() {
  return (
    <div className="w-screen flex justify-center items-center">

      <div className="flex flex-col items-center text-center">
        <img className="w-2/5 xl:w-1/5" src="/construction.svg" />
        <h1 className="text-4xl lg:text-6xl font-bold mt-5 px-5">
          On Going Construction
        </h1>
        <p className="text-xl">Get invited and be the first to join</p>

        <form className="flex flex-col lg:flex-row border border-gray-500 p-3 mt-5 xl:w-4/6 ">
          <input
            placeholder="Email Address"
            type="email"
            className="lg:w-3/4 p-3"
          />
          <input
            type="submit"
            value="Get Notified"
            className="lg:w-1/4 bg-slate-900 text-white p-3 hover:bg-gray-500 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
}
