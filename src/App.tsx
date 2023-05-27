import { useCallback } from "react";

import { User as FirebaseUser } from "firebase/auth";
import { Authenticator, buildCollection, FirebaseCMSApp } from "firecms";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

// TODO: Replace with your config
const firebaseConfig = {
  apiKey: "AIzaSyAoE1F2o3WBpJaBh4ikFeVaEI6aFeyu0ck",
  authDomain: "ecclesia-church.firebaseapp.com",
  projectId: "ecclesia-church",
  storageBucket: "ecclesia-church.appspot.com",
  messagingSenderId: "975793776023",
  appId: "1:975793776023:web:8e11618d50db0eae6490d2",
};
// const locales = {
//     "en-US": "English (United States)",
//     "es-ES": "Spanish (Spain)",
//     "de-DE": "German
// 

type Event = {
  id: string;
  title: string;

  imageUrl: string;
  link: string;
  description: string;
  videoLink: string;

  date: Date;
};

const eventsCollection = buildCollection<Event>({
  name: "Events",
  singularName: "Event",
  path: "events",
  permissions: ({}) => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),

  properties: {
    id: {
      name: "ID",
      dataType: "string",
      validation: { required: true },
    },

    title: {
      name: "Title",
      dataType: "string",
      validation: { required: true },
    },

    imageUrl: {
      name: "Image",
      dataType: "string",
      storage: {
        storagePath: "images",
        acceptedFiles: ["image/*"],
      },
    },
    link: {
      name: "Link",
      dataType: "string",
    },
    description: {
      name: "Description",
      dataType: "string",
    },
    videoLink: {
      name: "Video Link",
      dataType: "string",
    },
    date: {
      name: "Date",
      dataType: "date",
      validation: { required: true },
    },
  },
});

type Users = {
  id: string;
  username: string;
  email: string;
  date: Date;
  fullName: string;
  photo: string;
  profileType: string;
  phoneNumber: string;
};

const usersCollection = buildCollection<Users>({
  name: "Users",
  singularName: "User",
  path: "users",
  permissions: ({  }) => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),

  properties: {
    id: {
      name: "ID",
      dataType: "string",
      validation: { required: true },
    },
    username: {
      name: "Username",
      dataType: "string",
      validation: { required: true },
    },
    email: {
      name: "Email",
      dataType: "string",
      validation: { required: true },
    },
    date: {
      name: "Date",
      dataType: "date",
    },
    fullName: {
      name: "Full Name",
      dataType: "string",
    },
    photo: {
      name: "Photo",
      dataType: "string",
    },
    profileType: {
      name: "Profile Type",
      dataType: "string",
    },
    phoneNumber: {
      name: "Phone Number",
      dataType: "string",
    },
  },
});

type Podcast = {
  id: string;
  link: string;
};



const podcastsCollection = buildCollection<Podcast>({
  name: "Podcasts",
  singularName: "Podcast",
  path: "podcasts",
  permissions: ({  }) => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),

  properties: {
    id: {
      name: "ID",
      dataType: "string",
      validation: { required: true },
    },
    link: {
      name: "Link",
      dataType: "string",
      validation: { required: true },
    },
  },
});

type Giving = {
  id: string;
  name: string;
  amount: number;
  date_paid: Date;
  payment_method: string;
  giving_type: string;
};

const givingCollection = buildCollection<Giving>({
  name: "Givings",
  singularName: "Giving",
  path: "givings",
  permissions: ({ }) => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),

  properties: {
    id: {
      name: "ID",
      dataType: "string",
      validation: { required: true },
    },
    name: {
      name: "Name",

      dataType: "string",
      validation: { required: true },
    },
    amount: {
      name: "Amount",
      dataType: "number",
      validation: { required: true },
    },
    date_paid: {
      name: "Date Paid",
      dataType: "date",
      validation: { required: true },
    },

    payment_method: {
      name: "Payment Method",
      dataType: "string",
      validation: { required: true },
    },
    giving_type: {
      name: "Giving Type",
      dataType: "string",
      validation: { required: true },
    },
  },
});

export default function App() {
  const myAuthenticator: Authenticator<FirebaseUser> = useCallback(
    async ({ user, authController }) => {
      if (user?.email?.includes("flanders")) {
        throw Error("Stupid Flanders!");
      }

      console.log("Allowing access to", user?.email);
      // This is an example of retrieving async data related to the user
      // and storing it in the controller's extra field.
      const sampleUserRoles = await Promise.resolve(["admin"]);
      authController.setExtra(sampleUserRoles);

      return true;
    },
    []
  );

  return (
    <FirebaseCMSApp
      name={"Ecclesias Admin"}
      authentication={myAuthenticator}
      collections={[
        eventsCollection,
        usersCollection,
        podcastsCollection,
        givingCollection,
      ]}
      firebaseConfig={firebaseConfig}
    />
  );
}
