import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { IconBrandGoogleDrive } from "@tabler/icons-react";
import { IconApi } from "@tabler/icons-react";
import { IconDatabase } from "@tabler/icons-react";
import { useAuth } from "../contexts/AuthContext";

const MainView = () => {
  const { caseload } = useAuth();

  return (
    <div className="min-h-screen grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 ">
      <Card className="w-full  bg-gray-900 border-gray-700 py-0">
        <CardContent className="rounded-xl  bg-gray-800 p-4 h-full">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-lg font-medium text-white">IEPs Coming Up</h3>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {caseload?.map((student) => {
              return (
                <li key={student.id}>
                  <a
                    href="#"
                    className="flex gap-4 justify-between h-full border-b-2 border-gray-700 p-4 hover:border-pink-600"
                  >
                    <strong className="font-medium text-white">
                      {student.name}
                    </strong>

                    <p className="mt-1 text-xs font-medium text-gray-300">
                      {student.student_id}
                    </p>
                  </a>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
      <Card className="w-full  bg-gray-900 border-gray-700 py-0">
        <div className="card min-h-60 w-full">
          <div className="card-body text-white flex  items-center justify-center h-full flex-col">
            <div className="icon-[tabler--brand-google-drive] mb-2 size-8">
              <IconDatabase stroke={2} />
            </div>
            <div>No data to show.</div>
          </div>
        </div>
      </Card>
      <Card className="w-full  bg-gray-900 border-gray-700 py-0">
        <div className="card min-h-60 w-full">
          <div className="card-body text-white flex  items-center justify-center h-full flex-col">
            <div className="icon-[tabler--brand-google-drive] mb-2 size-8">
              <IconApi stroke={2} />
            </div>
            <div>No data to show.</div>
          </div>
        </div>
      </Card>
      <Card className="w-full  bg-gray-900 border-gray-700 py-0">
        <div className="card min-h-60 w-full">
          <div className="card-body text-white flex  items-center justify-center h-full flex-col">
            <span className="icon-[tabler--brand-google-drive] mb-2 size-8">
              <IconBrandGoogleDrive stroke={2} />
            </span>
            <span>No data to show.</span>
          </div>
        </div>
      </Card>
      <Card className="w-full  bg-gray-900 border-gray-700 py-0">
        <div className="card min-h-60 w-full">
          <div className="card-body text-white flex  items-center justify-center h-full flex-col">
            <div className="icon-[tabler--brand-google-drive] mb-2 size-8">
              <IconDatabase stroke={2} />
            </div>
            <div>No data to show.</div>
          </div>
        </div>
      </Card>
      <Card className="w-full  bg-gray-900 border-gray-700 py-0 card min-h-60 md:col-span-2">
        <div className="card min-h-60 w-full">
          <div className="card-body text-white flex  items-center justify-center h-full flex-col">
            <div className="icon-[tabler--brand-google-drive] mb-2 size-8">
              <IconDatabase stroke={2} />
            </div>
            <div>No data to show.</div>
          </div>
        </div>
      </Card>
      <Card className="w-full  bg-gray-900 border-gray-700 py-0">
        <div className="card min-h-60 w-full">
          <div className="card-body text-white flex  items-center justify-center h-full flex-col">
            <div className="icon-[tabler--brand-google-drive] mb-2 size-8">
              <IconDatabase stroke={2} />
            </div>
            <div>No data to show.</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MainView;
