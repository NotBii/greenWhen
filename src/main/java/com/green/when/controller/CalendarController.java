package com.green.when.controller;

import com.green.when.config.SecurityUtil;
import com.green.when.service.AdminService;
import com.green.when.service.CalendarService;
import com.green.when.vo.MemberResponseVo;
import com.green.when.vo.MemberVo;
import com.green.when.vo.ScheduleVo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/calendar")
public class CalendarController {

    @Autowired
    private CalendarService calendarService;

    @PostMapping("/saveSchedule")
    public void saveSchedules(@RequestBody List<ScheduleVo> schedules) {
        String userid = SecurityUtil.getCurrentMemberId();

        for (ScheduleVo schedule : schedules) {
            schedule.setUserid(userid);
            calendarService.insertSchedule(schedule);
        }
    }

    @GetMapping("/getSchedules")
    public List<ScheduleVo> getSchedules(@RequestParam int region) {
        String userid = SecurityUtil.getCurrentMemberId();
        ScheduleVo scheduleVo = new ScheduleVo();
        scheduleVo.setUserid(userid);
        scheduleVo.setRegion(region);
        List<ScheduleVo> savedSchedules = new ArrayList<>();

        List<ScheduleVo> getSchedules = calendarService.getSchedules(scheduleVo);
        for (ScheduleVo vo : getSchedules) {
            savedSchedules.add(vo);
        }

        return savedSchedules;
    }

    @GetMapping("/getAllSchedules")
    public List<ScheduleVo> getAllSchedules() {
        String userid = SecurityUtil.getCurrentMemberId();
        List<ScheduleVo> savedSchedules = new ArrayList<>();

        List<ScheduleVo> getSchedules = calendarService.getAllSchedules(userid);
        for (ScheduleVo vo : getSchedules) {
            savedSchedules.add(vo);
        }

        return savedSchedules;
    }

    @PostMapping("/deleteSchedules")
    public void deleteSchedules(@RequestBody List<ScheduleVo> schedules) {
        String userid = SecurityUtil.getCurrentMemberId();
        for (ScheduleVo schedule : schedules) {
            schedule.setUserid(userid);
            calendarService.deleteSchedule(schedule);
        }
    }

    @PostMapping("/updateSchedules")
    public void updateSchedules(@RequestBody List<Map> schedules) {
        String userid = SecurityUtil.getCurrentMemberId();
        for (Map schedule : schedules) {
            schedule.put("userid", userid);
            calendarService.updateSchedules(schedule);
        }
    }



}
