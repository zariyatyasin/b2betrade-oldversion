/* This example requires Tailwind CSS v2.0+ */

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const steps = [
  { name: "Step 1", href: "#", status: "complete" },
  { name: "Step 2", href: "#", status: "complete" },
  { name: "Step 3", href: "#", status: "current" },
  { name: "Step 4", href: "#", status: "upcoming" },
  { name: "Step 5", href: "#", status: "upcoming" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Steps() {
  return (
    <nav
      aria-label="Progress"
      className="   flex justify-center items-center mb-12"
    >
      {/* <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
              "relative"
            )}
          >
            {step.status === "complete" ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-950" />
                </div>
                <a
                  href="#"
                  className="relative w-8 h-8 flex items-center justify-center bg-gray-950 rounded-full hover:bg-gray-950"
                >
                  <CheckCircleIcon
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.name}</span>
                </a>
              </>
            ) : step.status === "current" ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <a
                  href="#"
                  className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-950 rounded-full"
                  aria-current="step"
                >
                  <span
                    className="h-2.5 w-2.5 bg-gray-950 rounded-full"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.name}</span>
                </a>
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <a
                  href="#"
                  className="group relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400"
                >
                  <span
                    className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.name}</span>
                </a>
              </>
            )}
          </li>
        ))}
      </ol> */}

      {`Cart > Place Order > Pay > Order Complete`}
    </nav>
  );
}
