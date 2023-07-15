import { useCallback } from "react";

import { User as FirebaseUser } from "firebase/auth";
import { Authenticator, buildCollection, FirebaseCMSApp } from "firecms";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";
import { categories } from "./enums";

// TODO: Replace with your config
const firebaseConfig = {
  apiKey: "AIzaSyAygio7gVXQoHVJujtbbmLHu6wx5zaY4VY",
  authDomain: "medical-75ae7.firebaseapp.com",
  projectId: "medical-75ae7",
  storageBucket: "medical-75ae7.appspot.com",
  messagingSenderId: "801283588951",
  appId: "1:801283588951:web:d7bcd8a3ff129a70df3412",
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
  phoneNumber: string;
};

const usersCollection = buildCollection<User>({
  name: "Users",
  singularName: "User",
  path: "users",
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
    name: {
      name: "Name",
      dataType: "string",
      validation: { required: true },
    },
    email: {
      name: "Email",
      dataType: "string",
      validation: { required: true },
    },
    role: {
      name: "Role",
      dataType: "string",
      validation: { required: true },
    },
    photo: {
      name: "Photo",
      dataType: "string",
      validation: { required: true },
    },
    phoneNumber: {
      name: "Phone Number",
      dataType: "string",
      validation: { required: true },
    },
  },
});

type Product = {
  title: string;
  price: number;
  location: string;
  description: string;
  imageUrl: string;
  category: string;
  quantity: number;
  composition: string;
  vendor: string;
};

const productsCollection = buildCollection<Product>({
  name: "Products",
  singularName: "Product",
  path: "products",
  permissions: ({}) => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),

  properties: {
    // id: {
    //   name: "ID",
    //   dataType: "string",
    //   validation: { required: true },
    // },
    title: {
      name: "Title",
      dataType: "string",
      validation: { required: true },
    },
    price: {
      name: "Price",
      dataType: "number",
      validation: { required: true },
    },
    description: {
      name: "Description",
      dataType: "string",
      validation: { required: true },
    },
    imageUrl: {
      name: "Product image",
      dataType: "string",
      storage: {
        storagePath: "products",
      },
    },
    category: {
      name: "Category",
      dataType: "string",
      enumValues: categories,
      validation: { required: true },

      //i want user to selct from a list
    },
    quantity: {
      name: "Quantity",
      dataType: "number",
      validation: { required: true },
    },
    composition: {
      name: "Composition",
      dataType: "string",
      validation: { required: true },
    },
    vendor: {
      name: "Vendor",
      dataType: "string",
      validation: { required: true },
    },
    location: {
      name: "Location",
      dataType: "string",
      validation: { required: true },
    },
  },
});

type Order = {
  id: string;
  userId: string; //
  items: string[];
  status: string;
  total: number;
  payment_reference: string;
};

const ordersCollection = buildCollection<Order>({
  name: "Orders",
  singularName: "Order",
  path: "orders",
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
    userId: {
      name: "User ID",
      dataType: "string",
      validation: { required: true },
    },
    items: {
      name: "Items",

      dataType: "array",
      of: {
        dataType: "reference",
        path: "products",
        previewProperties: ["id", "title", "price", "quantity"],
      },

      validation: { required: true },
    },

    status: {
      name: "Status",
      dataType: "string",
      validation: { required: true },
    },
    total: {
      name: "Total",
      dataType: "number",
      validation: { required: true },
    },

    payment_reference: {
      name: "Payment Reference",
      dataType: "string",
      validation: { required: true },
    },
  },
});

// type Users = {
//   id: string;
//   username: string;
//   email: string;
//   date: Date;
//   fullName: string;
//   photo: string;
//   profileType: string;
//   phoneNumber: string;
// };

// const usersCollection = buildCollection<Users>({
//   name: "Users",
//   singularName: "User",
//   path: "users",
//   permissions: ({  }) => ({
//     read: true,
//     edit: true,
//     create: true,
//     delete: true,
//   }),

//   properties: {
//     id: {
//       name: "ID",
//       dataType: "string",
//       validation: { required: true },
//     },
//     username: {
//       name: "Username",
//       dataType: "string",
//       validation: { required: true },
//     },
//     email: {
//       name: "Email",
//       dataType: "string",
//       validation: { required: true },
//     },
//     date: {
//       name: "Date",
//       dataType: "date",
//     },
//     fullName: {
//       name: "Full Name",
//       dataType: "string",
//     },
//     photo: {
//       name: "Photo",
//       dataType: "string",
//     },
//     profileType: {
//       name: "Profile Type",
//       dataType: "string",
//     },
//     phoneNumber: {
//       name: "Phone Number",
//       dataType: "string",
//     },
//   },
// });

// type Podcast = {
//   id: string;
//   link: string;
// };

// const podcastsCollection = buildCollection<Podcast>({
//   name: "Podcasts",
//   singularName: "Podcast",
//   path: "podcasts",
//   permissions: ({  }) => ({
//     read: true,
//     edit: true,
//     create: true,
//     delete: true,
//   }),

//   properties: {
//     id: {
//       name: "ID",
//       dataType: "string",
//       validation: { required: true },
//     },
//     link: {
//       name: "Link",
//       dataType: "string",
//       validation: { required: true },
//     },
//   },
// });

// type Giving = {
//   id: string;
//   name: string;
//   amount: number;
//   date_paid: Date;
//   payment_method: string;
//   giving_type: string;
// };

// const givingCollection = buildCollection<Giving>({
//   name: "Givings",
//   singularName: "Giving",
//   path: "givings",
//   permissions: ({ }) => ({
//     read: true,
//     edit: true,
//     create: true,
//     delete: true,
//   }),

//   properties: {
//     id: {
//       name: "ID",
//       dataType: "string",
//       validation: { required: true },
//     },
//     name: {
//       name: "Name",

//       dataType: "string",
//       validation: { required: true },
//     },
//     amount: {
//       name: "Amount",
//       dataType: "number",
//       validation: { required: true },
//     },
//     date_paid: {
//       name: "Date Paid",
//       dataType: "date",
//       validation: { required: true },
//     },

//     payment_method: {
//       name: "Payment Method",
//       dataType: "string",
//       validation: { required: true },
//     },
//     giving_type: {
//       name: "Giving Type",
//       dataType: "string",
//       validation: { required: true },
//     },
//   },
// });

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
      collections={[productsCollection, usersCollection, ordersCollection]}
      firebaseConfig={firebaseConfig}
    />
  );
}
