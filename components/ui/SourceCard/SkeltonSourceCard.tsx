import clsx from "clsx";

const SkeltonSourceCard = () => (
  <div
    className={clsx(
      "w-96.5 max-w-full bg-white-500 border border-beige-600 flex flex-col",
      "p-5 gap-6 flex flex-col",
    )}
  >
    <div className="flex flex-col gap-1 w-full">
      <span className="w-20 h-3 bg-beige-600" />
      <span className="w-20 h-8 bg-beige-600" />
      <span className="w-20 h-3 bg-beige-600" />
    </div>

    <div className="flex gap-10">
      <div className="flex flex-col gap-0.5">
        <span className="w-15 h-8 bg-beige-600" />
        <span className="w-15 h-3 bg-beige-600" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="w-15 h-8 bg-beige-600" />
        <span className="w-15 h-3 bg-beige-600" />
      </div>
    </div>

    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="w-20 h-3 bg-beige-600" />

        <span className="w-20 h-3 bg-beige-600" />
      </div>
      <span className="w-20 h-3 bg-beige-600" />
    </div>

    <div className="flex justify-between pt-3">
      <span className="w-20 h-3 bg-beige-600" />
      <span className="w-20 h-3 bg-beige-600" />
    </div>
  </div>
);

export default SkeltonSourceCard;
