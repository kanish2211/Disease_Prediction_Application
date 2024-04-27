import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const backgroundImageUrl = "assets/images/landing_page.png";

  const features = [
    {
      title: "Predictive Disease Analysis",
      subtext:
        "Wondering what those symptoms might mean? Say no more. With healWell's advanced algorithms, simply input your symptoms, and let the application analyze and predict potential diseases. Get insights and recommendations tailored to your specific health concerns, allowing you to take proactive steps towards better health.",
      image: "assets/images/predict.png",
      blurText: "Predict Disease",
      navigate: "/prediction",
      color: "#EE9C6F",
    },
    {
      title: "Effortless Medicine Procurement",
      subtext:
        "Skip the hassle of visiting multiple pharmacies. healWell's integrated e-commerce platform allows you to purchase medicines with ease. Whether it's a prescription refill or over-the-counter essentials, find everything you need at your fingertips. Enjoy the convenience of doorstep delivery, ensuring you never miss a dose.",
      blurText: "Buy Medicines",
      image: "assets/images/medicine.png",
      navigate: "/medicines",
      color: "#8EBAF1",
    },
    {
      title: "Expert Online Consultations",
      subtext:
        "Need professional advice without leaving your home? healWell connects you with qualified doctors for virtual consultations. Discuss your health concerns, receive personalized guidance, and obtain prescriptions all within the comfort of your own space. Say goodbye to long waiting times and hello to efficient, convenient healthcare.",
      blurText: "Consult Doctor",
      navigate: "/doctor-consultation",
      image: "assets/images/consultation.png",
      color: "#14BBCB",
    },
    {
      title: "Stay updated",
      subtext:
        "Medical blogs and articles from all around the world is curated and brought to you so you can be updated. All the lifestyle articles, healthy habits, new medical researches and what not!",
      blurText: "Read Blogs",
      navigate: "/blogs",
      image: "assets/images/blogs.png",
      color: "#C9C9C7",
    },
  ];
  const navigate = useNavigate();
  const handleOnClick = (value) => {
    if (sessionStorage.getItem("email") == null) {
      navigate("/login");
    } else {
      navigate(value);
    }
  };

  return (
    <div className="min-h-screen h-full ">
      <div className="bg-[#c7afc1] flex h-screen">
        <div className="px-10 text-[65px] my-auto">
          <span className="font-extrabold">Welcome to HealWell </span>
          <br />
          <span className="text-[32px] text-gray-700 fade-in">
            Your Comprehensive Health Companion
          </span>
        </div>
        <video className="w-7/12 mx-auto bg-cover" autoPlay loop muted>
          <source src="assets/videos/landing_page.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="flex flex-wrap md:p-10 p-5 justify-around">
        {features.map((value, index) => (
          <div
            key={index}
            style={{ backgroundColor: value.color }}
            className="w-[45%] rounded-3xl md:px-16 py-12 m-8 px-6 text-xl relative"
          >
            <p className="text-white font-semibold text-3xl py-4 text-center">
              {value.title}
            </p>
            <div className="w-fit p-5 mx-auto rounded-3xl">
              <img src={value.image} className="mx-auto" alt={value.title} />
            </div>
            <p className="pt-1">{value.subtext}</p>
            <div
              style={{ backgroundColor: value.color }}
              className="absolute inset-0  opacity-0 hover:opacity-75 transition-opacity duration-300 rounded-3xl flex justify-center items-center"
            >
              <button
                className="bg-gray-700 px-4 py-2 rounded-lg opacity-100 text-white shadow-xl"
                onClick={() => handleOnClick(value.navigate)}
              >
                {value.blurText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
