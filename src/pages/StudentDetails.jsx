import { useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.png";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    user,
    navigation,
    userNavigation,
    signOutUser,
    myStudent,
    session,
    loading,
    fetchStudent,
    fetchCaseload,
  } = useAuth();

  useEffect(() => {
    if (loading || !session?.user?.email) return;

    const loadStudentData = async () => {
      await fetchCaseload(session?.user?.email ?? null);
      await fetchStudent(id);
    };

    loadStudentData();
  }, [id, session, loading]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleSignOut = async (e) => {
    e.preventDefault();
    const result = await signOutUser();
    if (result.success) navigate("/signIn");
  };

  return (
    <>
      <div className="h-full bg-gray-900 ">
        <Disclosure as="nav" className="bg-gray-800/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img alt="Your Company" src={logo} className="size-8" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "bg-gray-950/50 text-white"
                            : "text-gray-300 hover:bg-white/5 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <MenuButton className="relative flex max-w-xs items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src={user?.picture}
                        className="size-8 rounded-full outline -outline-offset-1 outline-white/10 object-cover"
                      />
                    </MenuButton>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      {userNavigation.map((item) =>
                        item.name === "Sign out" ? (
                          <MenuItem key={item.name}>
                            <p
                              onClick={handleSignOut}
                              className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                            >
                              {item.name}
                            </p>
                          </MenuItem>
                        ) : (
                          <MenuItem key={item.name}>
                            <p
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                            >
                              {item.name}
                            </p>
                          </MenuItem>
                        ),
                      )}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-open:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-open:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-950/50 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img
                    alt=""
                    src={user.picture}
                    className="size-10 rounded-full outline -outline-offset-1 outline-white/10 object-cover"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) =>
                  item.name === "Sign out" ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={handleSignOut}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                    >
                      {item.name}
                    </DisclosureButton>
                  ),
                )}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className="relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Student Details
            </h1>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8">
          <div>
            <div className="mt-6  border-white/10">
              <dl className="divide-y divide-white/10">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-100">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                    {myStudent?.name}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-100">
                    Grade Level
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                    {myStudent?.grade}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-100">
                    Eligibility Category
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                    {myStudent?.eligibility_category}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-100">
                    IEP Goals
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                    {myStudent?.IEP_goals?.map((goal, index) => (
                      <li key={index}>
                        <span>{goal.area}</span> - <span>{goal.goal}</span>
                      </li>
                    ))}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-100">
                    Services
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                    {myStudent?.services?.map((service, index) => (
                      <li key={index}>
                        <span>{service.type}</span> -{" "}
                        <span>{service.delivery}</span> -{" "}
                        <span>{service.frequency}</span>
                      </li>
                    ))}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-100">
                    IEP and related documents
                  </dt>
                  <dd className="mt-2 text-sm text-white sm:col-span-2 sm:mt-0">
                    <ul
                      role="list"
                      className="divide-y divide-white/5 rounded-md border border-white/10"
                    >
                      <li className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6">
                        <div className="flex w-0 flex-1 items-center">
                          <PaperClipIcon
                            aria-hidden="true"
                            className="size-5 shrink-0 text-gray-500"
                          />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium text-white">
                              Annual IEP.pdf
                            </span>
                            <span className="shrink-0 text-gray-500">
                              2.4mb
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 shrink-0">
                          <a
                            href="#"
                            className="font-medium text-indigo-400 hover:text-indigo-300"
                          >
                            Download
                          </a>
                        </div>
                      </li>
                      <li className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6">
                        <div className="flex w-0 flex-1 items-center">
                          <PaperClipIcon
                            aria-hidden="true"
                            className="size-5 shrink-0 text-gray-500"
                          />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium text-white">
                              Procedural Safeguards.pdf
                            </span>
                            <span className="shrink-0 text-gray-500">
                              4.5mb
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 shrink-0">
                          <a
                            href="#"
                            className="font-medium text-indigo-400 hover:text-indigo-300"
                          >
                            Download
                          </a>
                        </div>
                      </li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentDetails;
