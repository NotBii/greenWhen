package com.green.when.service;

import com.green.when.config.SecurityUtil;
import com.green.when.vo.MemberResponseVo;
import com.green.when.vo.MemberVo;
import com.green.when.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public MemberResponseVo getMyInfoBySecurity() {
        return userMapper.findByUserid(SecurityUtil.getCurrentMemberId())
                .map(MemberResponseVo::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    @Transactional
    public void changeMemberNickname(String userid, String usernickname) {
        MemberVo memberVo = userMapper.findByUserid(userid).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        memberVo.setNickname(usernickname);
        memberVo.setUserid(userid);
        userMapper.changeUserNickname(memberVo);
    }

    @Transactional
    public void changeMemberPassword(String exPassword, String newPassword) {
        MemberVo memberVo = userMapper.findByUserid(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        if (!passwordEncoder.matches(exPassword, memberVo.getUserpw())) {
            throw new RuntimeException("비밀번호가 맞지 않습니다");
        }
        memberVo.setPassword(passwordEncoder.encode((newPassword)));
        userMapper.changeUserPw(memberVo);
    }


}