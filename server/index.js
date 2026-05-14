io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data.room);

    socket.to(data.room).emit(
      "user_joined",
      `${data.username} joined the room`
    );

    console.log(
      `${data.username} joined ${data.room}`
    );
  });

  socket.on("send_message", (data) => {
    io.to(data.room).emit(
      "receive_message",
      data
    );
  });

  socket.on("typing", (username) => {
    socket.broadcast.emit(
      "typing",
      username
    );
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});