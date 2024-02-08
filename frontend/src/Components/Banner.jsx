import React from "react";

export default function Banner() {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-black p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl text-left">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit
              </h2>

              <p className="hidden text-white/90 sm:mt-4 sm:block text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
                egestas tempus tellus etiam sed. Quam a scelerisque amet
                ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat
                quisque ut interdum tincidunt duis.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
            <img
              alt="Student"
              src="https://pbs.twimg.com/media/DSlWgkQV4AAMPMA.jpg"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
            />

            <img
              alt="Student"
              src="https://mb.com.ph/media/Taguig_March162023_D_31130ebc3b/Taguig_March162023_D_31130ebc3b.jpg"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
