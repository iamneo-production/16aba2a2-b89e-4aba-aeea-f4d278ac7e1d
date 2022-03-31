package com.examly.springapp;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
//import org.junit.Test;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
class SpringappApplicationTests {

	@Autowired
	private MockMvc mockMvc;
	private String jwtToken;

	@BeforeEach
	public void setup() throws Exception {
		String newAdmin = "{\"email\":\"test3@gmail.com\",\"password\":\"Test@123\",\"username\":\"TestUser\",\"mobileNumber\":\"9876543211\"}";

		mockMvc.perform(MockMvcRequestBuilders.post("/admin/signup")
				.contentType(MediaType.APPLICATION_JSON)
				.content(newAdmin)
				.accept(MediaType.APPLICATION_JSON));

		mockMvc.perform(MockMvcRequestBuilders.post("/admin/login")
				.contentType(MediaType.APPLICATION_JSON)
				.content(newAdmin)
				.accept(MediaType.APPLICATION_JSON)).andDo((data) -> {
					this.jwtToken = "Bearer " + data.getResponse().getContentAsString();
				})
				.andReturn();

		System.out.println("Running before...");
	}

	@Test
	@Transactional
	public void BE_Add_User() throws Exception {
		String newUser = "{\"email\":\"test@gmail.com\",\"password\":\"Test@123\",\"username\":\"TestUser\",\"mobileNumber\":\"9876543210\",\"active\":\"True\",\"role\":\"Admin\"}";

		mockMvc.perform(MockMvcRequestBuilders.post("/admin/addUser")
				.contentType(MediaType.APPLICATION_JSON)
				.header("Authorization", jwtToken)
				.content(newUser)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated())
				.andReturn();
	}

	@Test
	@Transactional
	public void BE_Get_AllMovieList() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/music")
				.contentType(MediaType.APPLICATION_JSON)
				.header("Authorization", jwtToken)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("$").isNotEmpty())
				.andReturn();
	}

	@Test
	@Transactional
	public void BE_Get_AllMusic() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/admin/music")
				.contentType(MediaType.APPLICATION_JSON)
				.header("Authorization", jwtToken)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("$").isNotEmpty())
				.andReturn();
	}

	@Test
	@Transactional
	public void BE_GET_AllComments() throws Exception {

		mockMvc.perform(MockMvcRequestBuilders.get("/admin/comment")
				.contentType(MediaType.APPLICATION_JSON)
				.header("Authorization", jwtToken)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andReturn();
	}
}
