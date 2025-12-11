import {
  ServerIcon,
  DocumentTextIcon,
  HeartIcon,
  StarIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "IEP Management",
    description:
      "SEIS is a web-based system that allows centralized, online access for writing IEPs, managing Special Education data, CALPADS reporting, and service tracking.",
    icon: DocumentTextIcon,
  },
  {
    name: "Medi-Cal Billing",
    description:
      "Seamless integration with Service Tracker for LEA Medi-Cal Interim Reimbursement making it easier than ever to document delivery of services all in one place..",
    icon: HeartIcon,
  },
  {
    name: "SIS Integration",
    description:
      "Integrations eliminate the need for duplicate entries, syncs the data between your SIS and SEIS, and automatically updates data on a nightly basis.",
    icon: ServerIcon,
  },
  {
    name: "Beyond SST",
    description:
      "BeyondSST provides a solution for many of the challenges that schools often experience with Student Success Teams by providing you with a place to record SST and 504 interventions, observations and meetings as well as sharing this data with the whole team.",
    icon: StarIcon,
  },
];

const Features = () => {
  return (
    <div className="overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-[#393]">
                Services
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                What We Do
              </p>

              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-white lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-white">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 size-5 text-[#393]"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#393] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Request Demo
              </a>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src="https://www.seis.org/images/home/classroom.jpg"
            width={2432}
            height={1442}
            className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:ml-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
