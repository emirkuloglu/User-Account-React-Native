import { Text, View, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const HomePage = () => {

  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editLesson, setEditLesson] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  // GET DATA WITH ID
  const getData = async () => {
    try {
      const allData = [];
      const querySnapshot = await getDocs(collection(db, "ReactNativeLessons"));
      querySnapshot.forEach((doc) => {
        allData.push({ id: doc.id, ...doc.data() });
      });
      setData(allData);
    } catch (error) {
      console.log(error);
    }
  };

  // SEND NEW DATA TO FIREBASE
  const sendData = async () => {
    try {
      const docRef = await addDoc(collection(db, "ReactNativeLessons"), {
        title: "Zero to Hero.",
        content: "React Native tutorial for beginners",
        lesson: 18
      });
      console.log("Document written with ID: ", docRef.id);
      getData();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // DELETE DATA BY ID
  const deleteData = async (id) => {
    try {
      await deleteDoc(doc(db, "ReactNativeLessons", id));
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  // START EDIT MODE AND FILL FORM
  const startEdit = (item) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditContent(item.content);
    setEditLesson(String(item.lesson));
  };

  // SUBMIT UPDATED DATA TO FIRESTORE
  const submitUpdate = async () => {
    if (!editingId) return;

    try {
      const docRef = doc(db, "ReactNativeLessons", editingId);
      await updateDoc(docRef, {
        title: editTitle,
        content: editContent,
        lesson: Number(editLesson),
      });
      setEditingId(null);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  // CANCEL EDIT MODE
  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    
    <View className="flex-1 items-center justify-center bg-white px-4 pb-3">

      <View className="items-center bg-white">
        <Text className="text-black font-bold text-2xl mb-4 pt-10">HomePage</Text>
      </View>

    <ScrollView className="flex-1 bg-white px-4">

      {data.map((item, index) => (
        <View key={item.id} className="mb-4 p-4 border rounded w-full bg-gray-100">
          <Text className="text-black font-bold mb-2">#{index + 1}</Text>

          {editingId === item.id ? (
            <>
              <TextInput
                className="border p-2 mb-2 rounded bg-white"
                placeholder="Title"
                value={editTitle}
                onChangeText={setEditTitle}
                />
              <TextInput
                className="border p-2 mb-2 rounded bg-white"
                placeholder="Content"
                value={editContent}
                onChangeText={setEditContent}
                />
              <TextInput
                className="border p-2 mb-2 rounded bg-white"
                placeholder="Lesson"
                keyboardType="numeric"
                value={editLesson}
                onChangeText={setEditLesson}
                />

              <Pressable
                onPress={submitUpdate}
                className="bg-green-600 p-2 rounded mb-2"
                >
                <Text className="text-white text-center font-bold">Save</Text>
              </Pressable>

              <Pressable
                onPress={cancelEdit}
                className="bg-gray-600 p-2 rounded"
              >
                <Text className="text-white text-center font-bold">Cancel</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text className="text-black mb-1">Title: {item.title}</Text>
              <Text className="text-black mb-1">Content: {item.content}</Text>
              <Text className="text-black mb-2">Lesson: {item.lesson}</Text>

              <Pressable
                onPress={() => startEdit(item)}
                className="bg-blue-600 p-2 rounded mb-2"
                >
                <Text className="text-white text-center font-bold">Update</Text>
              </Pressable>

              <Pressable
                onPress={() => deleteData(item.id)}
                className="bg-red-600 p-2 rounded"
                >
                <Text className="text-white text-center font-bold">Delete</Text>
              </Pressable>
            </>
          )}
        </View>
      ))}
    </ScrollView>

      <Pressable
        onPress={sendData}
        className="w-full h-12 rounded bg-green-600 items-center justify-center mt-2"
        >
        <Text className="text-white font-bold">Add Data</Text>
      </Pressable>
    </View>
  );
}

export default HomePage;
