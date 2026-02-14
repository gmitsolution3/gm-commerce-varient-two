import React from "react";
import { Truck, Repeat, ThumbsUp, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Within 24-48 hours",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Repeat,
    title: "Easy Returns",
    description: "7 days exchange",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: ThumbsUp,
    title: "Best Prices",
    description: "Guaranteed deals",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help",
    gradient: "from-violet-400 to-purple-500",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>

                  {/* Text */}
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};