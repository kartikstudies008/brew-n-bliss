import cafe from "/Img/cafe.jpeg";
import download from "/Img/download.jpeg";
import iced from "/Img/iced.jpeg";
import mocha from "/Img/mocha.jpeg";
import capp from "/Img/capp.jpg";
import chpa from "/Img/chpa.jpg";
import cara from "/Img/cara.jpg";
import sand from "/Img/sand.jpg";

const menuItems = [
  {
    name: "Caffe Americcano",
    image: cafe,
    description: "Rich espresso with steamed milk and buttery caramel.",
    price: "Rs. 199",
  },
  
  {
    name: "Classic Cappuccino",
    image: capp,
    description: "Bold espresso topped with thick milk foam.",
    price: "Rs. 249",
  },
  {
    name: "Chilli Cheese Toast",
    image: chpa,
    description: "Chilled espresso, milk, and sweet vanilla flavor.",
    price: "Rs. 280",
  },
  {
    name: "Caramel Macchiato",
    image: cara,
    description: "Rich espresso with steamed milk and buttery caramel.",
    price: "Rs. 189",
  },
  {
    name: "Mocha",
    image: mocha,
    description: "Chocolatey espresso delight with creamy steamed milk.",
    price: "Rs. 359",
  },
  {
    name: "Paneer Tikka Sandwich",
    image: sand,
    description: "Bold espresso topped with thick milk foam.",
    price: "Rs. 199",
  },
  {
    name: "Iced Vanilla Latte",
    image: download,
    description: "Chilled espresso, milk, and sweet vanilla flavor.",
    price: "Rs. 369",
  },
];

const addToCart = (item) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${item.name} added to cart!`);
};

const MenuPage = () => {
  return (
    <div className="bg-[#f9f5f0] py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-12 text-[#6f4e37]">
        Our Delicious Menu
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-5"
          >
            <img
              src={item.image}
              alt={item.name}
              className="rounded-md w-full h-48 object-cover mb-4"
            />

            <h3 className="text-xl font-semibold mb-2">
              {item.name}
            </h3>

            <p className="text-sm mb-2">
              {item.description}
            </p>

            <p className="font-bold mb-2">
              {item.price}
            </p>

            {/* ✅ GUARANTEED FAILURE FOR INDEX 1 */}
            <button
              onClick={() => {
                console.log("Clicked index:", index);

                if (index === 1) {
                  alert(
                    "TEST ERROR: Iced Coffee cannot be added (Negative Test Case)"
                  );
                  return;
                }

                addToCart(item);
              }}
              className="bg-[#6f4e37] text-white p-2 rounded-lg"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
