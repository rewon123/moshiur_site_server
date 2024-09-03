const express = require('express');
const app = express();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 9191;

app.use(cors());
app.use(express.json());

const uri = "mongodb://jarjisurrahman3333a:w4SArnwzGeCY8NC7@ac-wuf6ck0-shard-00-00.jpboaxe.mongodb.net:27017,ac-wuf6ck0-shard-00-01.jpboaxe.mongodb.net:27017,ac-wuf6ck0-shard-00-02.jpboaxe.mongodb.net:27017/?ssl=true&replicaSet=atlas-4zogfq-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const db = client.db("moshiurDatabase");
const allStudents = db.collection("students");
const allBooks = db.collection("books");
const allFollower = db.collection("followers");
const allBlogs = db.collection("blogs");

async function run() {
    try {
        await client.connect();

        // Routes for managing students
        app.post('/addStudent', async (req, res) => {
            const students = req.body;
            const result = await allStudents.insertOne(students);
            res.send(result);
        });

        app.get('/allStudents', async (req, res) => {
            const cursor = allStudents.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.delete('/deleteStudent/:id', async (req, res) => {
            const studentId = req.params.id;
            try {
                const filter = { _id: new ObjectId(studentId) };
                const result = await allStudents.deleteOne(filter);

                if (result.deletedCount === 0) {
                    return res.status(404).json({ message: 'student not found' });
                }
                res.status(200).json({ message: 'student deleted successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // books 
        app.get('/allBooks', async (req, res) => {
            const cursor = allBooks.find();
            const result = await cursor.toArray();
            res.send(result);
        });
        app.post('/addBook', async (req, res) => {
            const books = req.body;
            const result = await allBooks.insertOne(books);
            res.send(result);
        });
        app.delete('/deleteBook/:id', async (req, res) => {
            const bookId = req.params.id;
            try {
                const filter = { _id: new ObjectId(bookId) };
                const result = await allBooks.deleteOne(filter);

                if (result.deletedCount === 0) {
                    return res.status(404).json({ message: 'book not found' });
                }
                res.status(200).json({ message: 'book deleted successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });


        // blogs
        app.post('/addBlog', async (req, res) => {
            const students = req.body;
            const result = await allBlogs.insertOne(students);
            res.send(result);
        });

        app.get('/allBlogs', async (req, res) => {
            const cursor = allBlogs.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.delete('/deleteBlog/:id', async (req, res) => {
            const blogId = req.params.id;
            try {
                const filter = { _id: new ObjectId(blogId) };
                const result = await allBlogs.deleteOne(filter);

                if (result.deletedCount === 0) {
                    return res.status(404).json({ message: 'blog not found' });
                }
                res.status(200).json({ message: 'blog deleted successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });



        // followers
        app.post('/addFollower', async (req, res) => {
            const follower = req.body;
            const result = await allFollower.insertOne(follower);
            res.send(result);
        });

        app.get('/allFollower', async (req, res) => {
            const cursor = allFollower.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.delete('/deleteFollower/:id', async (req, res) => {
            const followerId = req.params.id;
            try {
                const filter = { _id: new ObjectId(followerId) };
                const result = await allFollower.deleteOne(filter);

                if (result.deletedCount === 0) {
                    return res.status(404).json({ message: 'follower not found' });
                }
                res.status(200).json({ message: 'follower deleted successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });












        app.patch('/updateMedicine/:id', async (req, res) => {
            try {
                const medicineId = new ObjectId(req.params.id);
                const updatedData = req.body;
                delete updatedData._id;

                allMedicine.updateOne(
                    { _id: medicineId },
                    { $set: updatedData }
                )
                    .then(result => {
                        if (result.matchedCount === 0) {
                            return res.status(404).json({ message: 'Medicine not found' });
                        }
                        res.status(200).json({ message: 'Medicine updated successfully' });
                    });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        app.delete('/deleteMedicine/:id', async (req, res) => {
            const medicineId = req.params.id;
            try {
                const filter = { _id: new ObjectId(medicineId) };
                const result = await allMedicine.deleteOne(filter);

                if (result.deletedCount === 0) {
                    return res.status(404).json({ message: 'Medicine not found' });
                }
                res.status(200).json({ message: 'Medicine deleted successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // Routes for managing articles
        app.post('/addArticles', async (req, res) => {
            const students = req.body;
            const result = await allArticles.insertOne(students);
            res.send(result);
        });

        app.get('/allArticles', async (req, res) => {
            const cursor = allArticles.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.patch('/updateArticle/:id', async (req, res) => {
            try {
                const medicineId = new ObjectId(req.params.id);
                const updatedData = req.body;
                delete updatedData._id;

                allArticles.updateOne(
                    { _id: medicineId },
                    { $set: updatedData }
                )
                    .then(result => {
                        if (result.matchedCount === 0) {
                            return res.status(404).json({ message: 'Medicine not found' });
                        }
                        res.status(200).json({ message: 'Medicine updated successfully' });
                    });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        app.delete('/deleteArticle/:id', async (req, res) => {
            const medicineId = req.params.id;
            try {
                const filter = { _id: new ObjectId(medicineId) };
                const result = await allArticles.deleteOne(filter);

                if (result.deletedCount === 0) {
                    return res.status(404).json({ message: 'Medicine not found' });
                }
                res.status(200).json({ message: 'Medicine deleted successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // Routes for managing doctors
        app.get('/allDoctors', async (req, res) => {
            const cursor = allDoctors.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.post('/addDoctor', async (req, res) => {
            const doctor = req.body;
            const result = await allDoctors.insertOne(doctor);
            res.send(result);
        });

        app.patch('/updateDoctor/:id', async (req, res) => {
            try {
                const doctorId = new ObjectId(req.params.id);
                const updatedData = req.body;
                delete updatedData._id;

                allDoctors.updateOne(
                    { _id: doctorId },
                    { $set: updatedData }
                )
                    .then(result => {
                        if (result.matchedCount === 0) {
                            return res.status(404).json({ message: 'doctor not found' });
                        }
                        res.status(200).json({ message: 'doctor updated successfully' });
                    });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        app.delete('/deleteDoctor/:id', async (req, res) => {
            const doctorId = req.params.id;
            try {
                const filter = { _id: new ObjectId(doctorId) };
                const result = await allDoctors.deleteOne(filter);

                if (result.deletedCount === 0) {
                    return res.status(404).json({ message: 'doctor not found' });
                }
                res.status(200).json({ message: 'doctor deleted successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // Routes for managing teachers
        app.post('/addTeacher', async (req, res) => {
            const teacher = req.body;
            const result = await allTeachers.insertOne(teacher);
            res.send(result);
        });

        app.get('/allTeachers', async (req, res) => {
            const cursor = allTeachers.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        // Routes for managing appointments
        app.post('/addAppointments', async (req, res) => {
            const students = req.body;
            const result = await allAppointments.insertOne(students);
            res.send(result);
        });

        app.get('/allAppointments', async (req, res) => {
            const cursor = allAppointments.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.patch('/updateAppointment/:id', async (req, res) => {
            try {
                const doctorId = new ObjectId(req.params.id);
                const updatedData = req.body;
                delete updatedData._id;

                allAppointments.updateOne(
                    { _id: doctorId },
                    { $set: updatedData }
                )
                    .then(result => {
                        if (result.matchedCount === 0) {
                            return res.status(404).json({ message: 'doctor not found' });
                        }
                        res.status(200).json({ message: 'doctor updated successfully' });
                    });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });


        // Routes for managing orders
        app.post('/addOrder', async (req, res) => {
            const data = req.body;
            const result = await allOrders.insertOne(data);
            res.send(result);
        });

        app.get('/allOrders', async (req, res) => {
            const data = allOrders.find();
            const result = await data.toArray();
            res.send(result);
        });

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Close the client when done
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
