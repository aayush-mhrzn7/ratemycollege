import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import Marquee from "react-fast-marquee";
import StudentReviewDetail from "./internal/StudentReviewDetail";
const testimonials = [
  {
    id: 1,
    name: "Aayush Shrestha",
    designation: "BSc CSIT Student",
    stars: 4,
    college: "Tribhuvan University",
    testimonial:
      "The course structure is solid and the teachers are supportive. Practical exposure is improving and the environment is great for tech enthusiasts.",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: 2,
    name: "Sneha Gurung",
    designation: "BBA Student",
    college: "Kathmandu University School of Management",
    stars: 2,
    testimonial:
      "The program is good but the workload is intense. Facilities are great, but management can be slow at times.",
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
  },
  {
    id: 3,
    name: "Bikash Tamang",
    designation: "BIT Student",
    stars: 4,
    college: "Pokhara University",
    testimonial:
      "The coursework is well-balanced with practicals. Teachers are experienced and the learning environment is peaceful and student-friendly.",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    id: 4,
    name: "Prakriti Shah",
    designation: "BHM Student",
    college: "GoldenGate International College",
    testimonial:
      "Good facilities and friendly instructors. The hands-on training and exposure to the hospitality industry are strong points.",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    stars: 4,
  },
  {
    id: 5,
    name: "Saurav Adhikari",
    designation: "BE Computer Student",
    college: "Pulchowk Engineering Campus",
    testimonial:
      "One of the best engineering environments in Nepal. The competition is tough but it pushes you to grow every day.",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    stars: 4,
  },
  {
    id: 6,
    name: "Riya KC",
    designation: "BSc Nursing Student",
    stars: 4,
    college: "Patan Academy of Health Sciences",
    testimonial:
      "The teaching methodology is exceptional and the clinical exposure is unmatched. A great place for aspiring healthcare professionals.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const Testimonials = () => (
  <div className=" py-12">
    <div className="h-full w-full">
      <h2 className="text-2xl font-semibold  tracking-[-0.03em]  text-pretty">
        Trending Reviews
      </h2>

      <Marquee
        pauseOnHover
        pauseOnClick
        className="mt-8 flex gap-8 items-center overflow-auto  relative"
      >
        <TestimonialList />
      </Marquee>
    </div>
  </div>
);

export const TestimonialList = () =>
  testimonials.map((testimonial) => (
    <div
      key={testimonial.id}
      className=" max-w-sm border-2 mx-3 border-border rounded-xl p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col ">
            {" "}
            <div>
              <p className="text-lg font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500">
                {testimonial.designation} at {testimonial.college}
              </p>
            </div>
            <div className="flex gap-2 items-center my-2">
              {Array.from({ length: testimonial.stars }).map((item, index) => (
                <Star key={index} className="size-4 text-yellow-500" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-5 text-[17px]">{testimonial.testimonial}</p>
    </div>
  ));
export const SecondaryTestimonialList = () =>
  testimonials.map((testimonial) => (
    <StudentReviewDetail
      key={testimonial.id}
      trigger={
        <div
          key={testimonial.id}
          className="border-2 border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
                  {testimonial.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex items-start justify-start flex-col ">
                {" "}
                <div>
                  <p className="text-lg text-start font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.designation} at {testimonial.college}
                  </p>
                </div>
                <div className="flex gap-2 items-center my-2">
                  {Array.from({ length: testimonial.stars }).map(
                    (item, index) => (
                      <Star key={index} className="size-4 text-yellow-500" />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <p className="mt-5 text-[17px] text-start">
            {testimonial.testimonial}
          </p>
        </div>
      }
    />
  ));
export default Testimonials;
